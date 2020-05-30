import { AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { AppDispatch, AppThunk, RootState } from '../app/store';
import { createStatusActions } from '../app/status/helpers';
import { AxiosInstance } from './axios-instance';

type Methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
interface IBaseExtendedAction {
  type: string;
  preventDefault?: boolean;
}
interface ISuccessExtendedAction<DataType, BodyType> extends IBaseExtendedAction {
  handler: (dispatch: AppDispatch, data: DataType, thunkOptions?: IApiRequestThunkOptions<BodyType>) => void;
}
interface IFailureExtendedAction<BodyType> extends IBaseExtendedAction {
  handler: (dispatch: AppDispatch, message: string, thunkOptions?: IApiRequestThunkOptions<BodyType>) => void;
}

interface IApiRequestThunkCreatorOptions<DataType, BodyType> {
  actions: {
    success: string | ISuccessExtendedAction<DataType, BodyType>;
    failure?: string | IFailureExtendedAction<BodyType>;
  };
  endpoint: string | (() => string);
  method: Methods;
  defaultErrorMessage?: string;
  showToastOnFailure?: boolean;
}

interface IApiRequestThunkOptions<BodyType> {
  body?: BodyType; // Используется для тела запрос при методах POST, PATCH
  entity?: BodyType; // Передается в action при методе DELETE
  endpoint?: {
    bindings: { [key: string]: string | number };
  };
}

type ICreateApiRequestThunkReturnType<BodyType> = [
  /** Thunk */
  (thunkOptions?: IApiRequestThunkOptions<BodyType>) => AppThunk<Promise<void>>,
  /** Fetching / loading state selector */
  (state: RootState) => boolean,
];

function axiosFunctionFromMethodName(method: Methods) {
  switch (method) {
    case 'GET':
      return AxiosInstance.get;
    case 'POST':
      return AxiosInstance.post;
    case 'PUT':
      return AxiosInstance.put;
    case 'PATCH':
      return AxiosInstance.patch;
    case 'DELETE':
      return AxiosInstance.delete;
  }
}

function isBodyMethod(method: Methods) {
  switch (method) {
    case 'DELETE':
    case 'GET':
      return false;
    case 'POST':
    case 'PUT':
    case 'PATCH':
      return true;
  }
}

function bindEndpointParameters(endpoint: string, parameters: { [key: string]: string | number }): string {
  const keys = Object.keys(parameters);
  keys.forEach((e) => {
    endpoint = endpoint.replace(':' + e, parameters[e].toString());
  });
  return endpoint;
}

export function createApiRequestThunk<DataType = any, BodyType = DataType>(
  options: IApiRequestThunkCreatorOptions<DataType, BodyType>,
): ICreateApiRequestThunkReturnType<BodyType> {
  const statusActionKey = typeof(options.actions.success) === 'string' ?
    options.actions.success : options.actions.success.type;

  const thunk = (thunkOptions?: IApiRequestThunkOptions<BodyType>) => async (dispatch: AppDispatch): Promise<void> => {
    const { actions, endpoint, method, defaultErrorMessage,
      showToastOnFailure } = options;

    const stateActions = createStatusActions(statusActionKey);
    let endpointUrl = typeof(endpoint) === 'string' ? endpoint : endpoint();
    if (thunkOptions?.endpoint?.bindings) {
      endpointUrl = bindEndpointParameters(endpointUrl, thunkOptions.endpoint.bindings);
    }

    try {
      dispatch(stateActions.request());

      let response: AxiosResponse<any>;
      const axiosMethod = axiosFunctionFromMethodName(method);
      if (isBodyMethod(method)) {
        if (!thunkOptions?.body) {
          throw new Error(`Тело запроса должно быть задано для метода: ${method}, путь: ${endpoint}`);
        }
        response = await axiosMethod(endpointUrl, thunkOptions.body);
      } else {
        response = await axiosMethod(endpointUrl);
      }
      if (typeof(actions.success) === 'string') {
        if (method === 'DELETE') {
          dispatch({
            type: actions.success,
            payload: thunkOptions?.entity,
          });
        } else {
          dispatch({
            type: actions.success,
            payload: response.data,
          });
        }
      } else {
        if (!actions.success.preventDefault) {
          dispatch({
            type: actions.success.type,
            payload: response.data,
          });
        }
        actions.success.handler(dispatch, response.data, thunkOptions);
      }
      dispatch(stateActions.success());
    } catch (err) {
      console.error(`api request on ${endpoint} error`, err);
      const message = (err as AxiosError).response?.data?.message ||
        defaultErrorMessage ||
        err.message ||
        `Ошибка в запросе: ${actions.failure}`;
      if (typeof(actions.failure) === 'string') {
        dispatch({
          type: actions.failure,
          payload: message,
        });
      } else if (typeof(actions.failure) === 'object') {
        if (!actions.failure.preventDefault) {
          dispatch({
            type: actions.failure.type,
            payload: message,
          });
        }
        actions.failure.handler(dispatch, message, thunkOptions);
      }
      dispatch(stateActions.failure());
      if (showToastOnFailure) {
        toast.error(message);
      }
    }
  };

  const loadingSelector = (state: RootState): boolean => state.status[statusActionKey]?.isLoading || false;

  return [
    thunk,
    loadingSelector,
  ];
}


export class ApiError extends Error {
  public code: number | undefined;
  constructor(err: { message: string | undefined; code: number | undefined }) {
    super(err.message || 'Неизвестная ошибка при обращении к серверу');
    this.code = err.code;
  }
}
