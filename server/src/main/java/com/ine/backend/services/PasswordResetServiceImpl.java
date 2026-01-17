package com.ine.backend.services;

import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

import com.ine.backend.entities.InptUser;
import com.ine.backend.security.OtpService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PasswordResetServiceImpl implements PasswordResetService {
	private static final Logger LOG = LoggerFactory.getLogger(PasswordResetServiceImpl.class);

	private final OtpService otpService;
	private final UserService userService;
	private final JavaMailSender mailSender;
	private final PasswordEncoder passwordEncoder;

	@Value("${spring.mail.username}")
	private String mailFrom;

	@Async
	@Override
	public void sendPasswordResetToken(String email) {
		final InptUser user = userService.findByEmail(email);
		if (user == null) {
			// Security: Don't reveal whether email exists - silently return
			return;
		}

		try {
			final String token = otpService.generateAndStoreOtp(email);

			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(email);
			message.setSubject("INE Alumni - Password Reset");
			message.setFrom(mailFrom);
			message.setText("Your password reset code: " + token + "\n\nThis code will expire in 60 minutes.");

			mailSender.send(message);
			LOG.debug("Password reset email dispatched to {}", email);
		} catch (Exception ex) {
			LOG.error("Failed to send password reset email to {}: {}", email, ex.getMessage(), ex);
		}
	}

	@Transactional
	@Override
	public void resetPassword(String email, String token, String newPassword) {
		final InptUser user = userService.findByEmail(email);
		if (user == null) {
			// Security: Same error message as invalid token to prevent enumeration
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The code is invalid or has expired.");
		}

		if (!otpService.isOtpValid(email, token)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The code is invalid or has expired.");
		}

		otpService.deleteOtp(email);

		user.setPassword(passwordEncoder.encode(newPassword));
		userService.saveUser(user);
	}
}
