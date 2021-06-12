package usmpcrm.mvc.usmpcrmmvc.dto;


import javax.validation.constraints.NotBlank;

import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Rating {

    private Integer id;

    @NotBlank(message = "Select a rate is required")
    private Double rateit;

    private String comments;

        //private Integer orderid

}
