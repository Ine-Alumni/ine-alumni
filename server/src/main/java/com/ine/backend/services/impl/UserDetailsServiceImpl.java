package com.ine.backend.services.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ine.backend.entities.User;
import com.ine.backend.repositories.AdminRepository;
import com.ine.backend.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
	
	private final UserRepository userRepository;
	private final AdminRepository adminRepository;

	@Override
	public UserDetails loadUserByUsername(String username) {
		if (username == null || username.isBlank()) {
			throw new UsernameNotFoundException("User not found.");
		}
		User user = userRepository.findByEmail(username);
		if (user == null) {
			user = adminRepository.findByEmail(username);
			if (user == null) {
				throw new UsernameNotFoundException("User not found.");
			}
		}
		return UserDetailsImpl.build(user);
	}
}
