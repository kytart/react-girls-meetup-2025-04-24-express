export type FetchSuccessResult<T> = { data: T };
export type FetchErrorResult = { error: Error };
export type FetchResult<T> = FetchSuccessResult<T> | FetchErrorResult;

export function isErrorResult<T>(result: FetchResult<T>): result is FetchErrorResult {
	return 'error' in result;
}
