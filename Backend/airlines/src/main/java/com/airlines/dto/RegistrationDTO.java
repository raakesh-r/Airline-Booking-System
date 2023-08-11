package com.airlines.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RegistrationDTO {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    @Email
    private String userEmail;
    @Size(min = 10,max = 10)
    private String userPhno;

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getuserPhno() {
        return this.userPhno;
    }

    public void setuserPhno(String userPhno) {
        this.userPhno = userPhno;
    }

    public String toString() {
        return "Registration info: username: " + this.username + " password: " + this.password + " userEmail: "
                + this.userEmail + " PhneNUmber: " + this.userPhno;
    }
}
