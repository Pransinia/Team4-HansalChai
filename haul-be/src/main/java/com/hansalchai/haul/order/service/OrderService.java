package com.hansalchai.haul.order.service;

import java.util.List;

import static com.hansalchai.haul.order.dto.OrderSearchResponse.*;
import static com.hansalchai.haul.reservation.constants.TransportStatus.*;
import static com.hansalchai.haul.reservation.service.ReservationService.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hansalchai.haul.car.entity.Car;
import com.hansalchai.haul.common.config.SmsUtil;
import com.hansalchai.haul.order.constants.OrderFilter;
import com.hansalchai.haul.order.dto.ApproveRequestDto;
import com.hansalchai.haul.order.dto.OrderSearchResponse;
import com.hansalchai.haul.owner.entity.Owner;
import com.hansalchai.haul.owner.repository.OwnerRepository;
import com.hansalchai.haul.reservation.entity.Reservation;
import com.hansalchai.haul.reservation.entity.Transport;
import com.hansalchai.haul.reservation.repository.ReservationRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class OrderService {

	private final ReservationRepository reservationRepository;
	private final OwnerRepository ownerRepository;
	private final SmsUtil smsUtil;

	@Transactional(readOnly = true)
	public OrderSearchResponse findAll(Long driverId, String sort, int page) {

		// 오더 리스트 조회를 위해 기사(Owner)의 차 id 탐색
		Owner owner = ownerRepository.findByDriverId(driverId)
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 owner입니다."));
		Car car = owner.getCar();
		Long carId = car.getCarId();

		//페이지 정보 생성
		PageRequest pageRequest = PageRequest.of(page, PAGECUT);

		// 리스트 정렬 기준에 맞는 쿼리를 실행해 오더 리스트 조회
		OrderFilter orderFilter = OrderFilter.findFilter(sort);
		Page<Reservation> pages = orderFilter.execute(reservationRepository, carId, pageRequest);

		//필요한 정보만 담아 변환
		List<OrderSearchResponseDto> orders = pages.getContent().stream()
			.map(OrderSearchResponseDto::new)
			.toList();
		boolean isLastPage = pages.getNumberOfElements() <= PAGECUT;

		// 응답 형태로 변환해서 반환
		return new OrderSearchResponse(orders, isLastPage);
	}

	@Transactional
	public void approve(Long driverId, ApproveRequestDto approveRequestDto) {

		// 1. 예약 정보 가져오기
		Reservation reservation = reservationRepository.findById(approveRequestDto.getReservationId())
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 예약번호입니다."));

		// 2. 기사 정보 가져오기
		Owner owner = ownerRepository.findByDriverId(driverId)
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 owner입니다."));

		// 3. 예약에 기사 배정 정보 저장, 운송 상태를 '운송 전'으로 변경
		reservation.setDriver(owner);
		Transport transport = reservation.getTransport();
		transport.updateTransportStatus(NOT_STARTED);

		// 4. 배정 알림을 고객에게 sms로 전송
		String customerTel = reservation.getUser().getTel();
		String reservationNumber = reservation.getNumber();
		smsUtil.send(customerTel, reservationNumber);
	}
}