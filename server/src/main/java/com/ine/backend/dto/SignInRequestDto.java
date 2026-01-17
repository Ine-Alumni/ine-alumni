package com.ine.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignInRequestDto {
	@Email(message = "Email address is not valid.")
	@NotBlank(message = "Email address is required.")
	private String email;

	@NotBlank(message = "Password is required.")
	private String password;
}
