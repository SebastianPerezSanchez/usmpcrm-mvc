package usmpcrm.mvc.usmpcrmmvc.service;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import usmpcrm.mvc.usmpcrmmvc.dto.Complaint;
import usmpcrm.mvc.usmpcrmmvc.dto.Customer;
import usmpcrm.mvc.usmpcrmmvc.dto.Rating;
import usmpcrm.mvc.usmpcrmmvc.integration.api.ComplaintAPI;
import usmpcrm.mvc.usmpcrmmvc.integration.api.CustomerAPI;
import usmpcrm.mvc.usmpcrmmvc.integration.api.RatingAPI;

@Service
public class GDHService {

    private CustomerAPI customerAPI;
    private RatingAPI ratingAPI;
    private ComplaintAPI complaintAPI;

    public GDHService(CustomerAPI customerAPI, RatingAPI ratingAPI, ComplaintAPI complaintAPI){
        this.customerAPI = customerAPI;
        this.ratingAPI = ratingAPI;
        this.complaintAPI = complaintAPI;
    }
    
    public List<Customer> getValidCustomers(){
        List<Customer> customersValid = customerAPI.getCustomers().stream().
        collect(Collectors.toList());
        return customersValid;
    }

    public void addValidCustomer(Customer c){
        if(calculateAge(c.getBirthdate(), LocalDate.now()) >= 18){
            customerAPI.postCustomers(c);
        }
    }

    public List<Rating> getValidRatings(){
        List<Rating> ratingsValid = ratingAPI.getRatings().stream().
        collect(Collectors.toList());

        return ratingsValid;
    }

    public void addValidRating(Rating r){
        ratingAPI.postRatings(r);
    }

    public List<Complaint> getValidComplaints(){
        List<Complaint> complaintsValid = complaintAPI.getComplaints().stream().
        collect(Collectors.toList());

        return complaintsValid;
    }

    public void addValidComplaint(Complaint c){
        complaintAPI.postComplaints(c);
    }



        public  int calculateAge(Date birthDate, LocalDate currentDate) {
            if ((birthDate != null) && (currentDate != null)) {
                return Period.between( LocalDate.ofInstant(birthDate.toInstant(), ZoneId.systemDefault()), currentDate).getYears();
            } else {
                return 0;
            }
        }


}
