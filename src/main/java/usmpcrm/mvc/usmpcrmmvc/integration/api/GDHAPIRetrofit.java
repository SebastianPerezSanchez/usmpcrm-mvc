package usmpcrm.mvc.usmpcrmmvc.integration.api;

import java.util.List;

import usmpcrm.mvc.usmpcrmmvc.dto.Customer;
import usmpcrm.mvc.usmpcrmmvc.dto.Rating;
import retrofit2.Call;
import retrofit2.http.GET;


public interface GDHAPIRetrofit {

    
    @GET("api/rating/")
    Call<List<Rating>> getRatings();
    
    @GET("api/customer/")
    Call<List<Customer>> getCustomers();
}