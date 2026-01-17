package com.ine.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ForgotPasswordRequestDto {
	@Email(message = "Email address is not valid.")
	@NotBlank(message = "Email address is required.")
	private String email;
}
