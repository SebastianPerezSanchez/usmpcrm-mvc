package usmpcrm.mvc.usmpcrmmvc.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import usmpcrm.mvc.usmpcrmmvc.dto.Customer;
import usmpcrm.mvc.usmpcrmmvc.dto.Rating;
import usmpcrm.mvc.usmpcrmmvc.integration.api.GDHAPIRetrofit;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;  
import retrofit2.converter.gson.GsonConverterFactory;

@Service
public class GDHRetrofitService {


    @Value("${appexternal.url}")
    private String URL_EXTERNAL;

    private GDHAPIRetrofit gdhAPI;

    public GDHRetrofitService(){
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://usmpcrm-api.herokuapp.com")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        gdhAPI = retrofit.create(GDHAPIRetrofit.class);
    }
    
    public List<Customer> queryCustomerExternal(){
        Call<List<Customer>> retrofitCall = gdhAPI.getCustomers();
        Response<List<Customer>> response = null;
        try {
            response = retrofitCall.execute();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return response.body();
    }

    public List<Rating> queryRatingExternal(){
        Call<List<Rating>> retrofitCall = gdhAPI.getRatings();
        Response<List<Rating>> response = null;
        try {
            response = retrofitCall.execute();
        } catch (IOException e){
            e.printStackTrace();
        }

        return response.body();
    }

}