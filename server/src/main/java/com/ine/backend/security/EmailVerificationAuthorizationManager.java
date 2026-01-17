package com.ine.backend.security;

import java.util.function.Supplier;

import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ine.backend.services.UserService;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class EmailVerificationAuthorizationManager implements AuthorizationManager<RequestAuthorizationContext> {
	private static final Logger LOG = LoggerFactory.getLogger(EmailVerificationAuthorizationManager.class);
	private final UserService userService;

	@Override
	public AuthorizationDecision check(Supplier<Authentication> authentication, RequestAuthorizationContext context) {
		Authentication auth = authentication.get();
		if (auth == null || !auth.isAuthenticated()) {
			return new AuthorizationDecision(false);
		}

		String username = auth.getName();
		if (username == null || username.isBlank()) {
			LOG.warn("Authenticated request without principal name; denying access.");
			return new AuthorizationDecision(false);
		}

		String requestPath = context.getRequest().getRequestURI();

		boolean isEmailVerified;
		try {
			isEmailVerified = userService.isEmailVerified(username);
		} catch (Exception ex) {
			LOG.error("Failed to check email verification for '{}': {}", username, ex.getMessage(), ex);
			return new AuthorizationDecision(false);
		}

		if (!isEmailVerified) {
			// allow unverified authenticated users to only access verification endpoints
			return new AuthorizationDecision(requestPath.startsWith("/api/v1/email"));
		}

		// Prevent verified users from accessing verification endpoints
		return new AuthorizationDecision(!requestPath.startsWith("/api/v1/email"));
	}
}
