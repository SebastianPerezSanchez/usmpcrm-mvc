package usmpcrm.mvc.usmpcrmmvc.dto;

import java.time.ZonedDateTime;


import javax.persistence.PrePersist;
import javax.validation.constraints.NotBlank;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint{

    private Integer id;
    @NotBlank(message="Subject is required")
    private String subject;

    @NotBlank(message = "Explanation is required")
    private String explanation;
    
    private ZonedDateTime date;


    /*
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    */
    //private Integer orderid
    
    @PrePersist
    void addTimestamp() {
    date = ZonedDateTime.now();
    }


}