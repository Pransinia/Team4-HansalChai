package com.hansalchai.haul.common.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class ApiResponse<T> {
	private int status;
	private String code;
	private String message;
	private T data;

	private static final String SUCCESS_CODE = "200";

	private ApiResponse(int status, String code, String message, T data){
		this.status = status;
		this.code = code;
		this.message = message;
		this.data = data;
	}

	private static <T> ApiResponse<T> ApiResponseSuccess(int status, String message, T data) {
		return new ApiResponse<>(status, SUCCESS_CODE, message, data);
	}

	private static ApiResponse ApiResponseError(int status, String code ,String message) {
		return new ApiResponse<>(status, code, message, null);
	}

	public static <T> ApiResponse<T> success(SuccessCode code, T data) {
		return ApiResponseSuccess(code.getStatus().value(), code.getMessage(), data);
	}

	public static  ApiResponse error(ErrorCode code) {
		return ApiResponseError(code.getStatus().value(), code.getCode() ,code.getMessage());
	}
}