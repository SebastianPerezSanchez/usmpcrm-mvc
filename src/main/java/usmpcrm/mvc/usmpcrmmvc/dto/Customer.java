package usmpcrm.mvc.usmpcrmmvc.dto;

import java.util.Date;

import javax.validation.constraints.NotBlank;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer{


    private Integer id;
    @NotBlank(message="Name field is required")
    private String name;

    @NotBlank(message="Last Name field is required")
    private String lastname;

    @NotBlank(message="Document field is required")
    private String documentID;

    @NotBlank(message="Birthdate field is required")
    private Date birthdate;

    @NotBlank(message="Email field is required")
    private String email;

    @NotBlank(message="Address field is required")
    private String address;


  

}