package com.hansalchai.haul.reservation.controller;

import static com.hansalchai.haul.common.auth.jwt.JwtProvider.*;
import static com.hansalchai.haul.common.utils.ApiResponse.*;
import static com.hansalchai.haul.reservation.dto.ReservationRequest.*;
import static com.hansalchai.haul.reservation.dto.ReservationResponse.*;

import java.util.List;
import java.util.Objects;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hansalchai.haul.common.auth.constants.Role;
import com.hansalchai.haul.common.auth.dto.AuthenticatedUser;
import com.hansalchai.haul.common.utils.ApiResponse;
import com.hansalchai.haul.common.utils.SuccessCode;
import com.hansalchai.haul.reservation.dto.ReservationRequest;
import com.hansalchai.haul.reservation.dto.ReservationResponse;
import com.hansalchai.haul.reservation.service.ReservationService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/reservations")
@RequiredArgsConstructor
public class ReservationRestController {
	private final ReservationService reservationService;

	@PostMapping("")
	public ResponseEntity<ApiResponse<ReservationRecommendationDTO>> postCustomerReservation(
		@Valid @RequestBody CreateReservationDTO reservationDTO,
		HttpServletRequest request
	) {
		AuthenticatedUser auth = (AuthenticatedUser)request.getAttribute(AUTHENTICATE_USER);
		ReservationRecommendationDTO response = reservationService.createReservation(reservationDTO, auth.getUserId());
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, response));
	}

	@PatchMapping("/{id}")
	public ResponseEntity<ApiResponse<Object>> patchCustomerReservation(
		@PathVariable("id") Long id,
		HttpServletRequest request
	){
		AuthenticatedUser auth = (AuthenticatedUser)request.getAttribute(AUTHENTICATE_USER);
		reservationService.patchReservation(id, auth.getUserId());
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, null));
	}

	@PostMapping("/guest")
	public ResponseEntity<ApiResponse<ReservationRecommendationDTO>> postGuestReservation(
		@Valid @RequestBody CreateReservationGuestDTO reservationDTO
	) {
		ReservationRecommendationDTO response = reservationService.createGuestReservation(reservationDTO);
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, response));
	}

	@PatchMapping("/guest/{id}")
	public ResponseEntity<ApiResponse<Object>> patchGuestReservation(
		@PathVariable("id") Long id
	){
		reservationService.patchGuestReservation(id);
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, null));
	}

	@GetMapping("")
	public ResponseEntity<ApiResponse<ReservationDTO>> getCustomerReservation(@RequestParam(value = "page", defaultValue = "0") int page, HttpServletRequest request){
		AuthenticatedUser auth = (AuthenticatedUser)request.getAttribute(AUTHENTICATE_USER);
		ReservationDTO response = reservationService.getReservation(page, auth.getUserId());
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, response));
	}

	@GetMapping("/guest")
	public ResponseEntity<ApiResponse<ReservationDTO>> getGuestReservation(@RequestParam(value = "number") String number){
		ReservationDTO response = reservationService.getGuestReservation(number);
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, response));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<ReservationDetailDTO>> getCustomerReservationDetail(@PathVariable("id")Long id, HttpServletRequest request){
		AuthenticatedUser auth = (AuthenticatedUser)request.getAttribute(AUTHENTICATE_USER);
		ReservationDetailDTO response = reservationService.getReservationDetail(id, auth.getUserId());
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, response));
	}

	@GetMapping("/guest/{id}")
	public ResponseEntity<ApiResponse<ReservationDetailDTO>> getGuestReservationDetail(@PathVariable("id")Long id){
		ReservationDetailDTO response = reservationService.getGuestReservationDetail(id);
		return ResponseEntity.ok(success(SuccessCode.GET_SUCCESS, response));
	}

}