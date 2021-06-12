package usmpcrm.mvc.usmpcrmmvc.integration.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import usmpcrm.mvc.usmpcrmmvc.dto.Customer;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CustomerAPI {
    
    @Value("${appexternal.endpoint.get.customers}")
    private String URL_GET_CUSTOMERS;

    @Value("${appexternal.endpoint.post.customers}")
    private String URL_POST_CUSTOMERS;

    private RestTemplate restTemplate;

    public CustomerAPI(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }

    public List<Customer> getCustomers(){
        ResponseEntity<List<Customer>> response = restTemplate.
                                    exchange(URL_GET_CUSTOMERS,
                                    HttpMethod.GET,
                                    HttpEntity.EMPTY,
                                    new ParameterizedTypeReference<List<Customer>>(){});
        return response.getBody();
    }

    public void postCustomers(Customer c){
        HttpEntity<Customer> bodyRequest = new  HttpEntity<Customer>(c);
        restTemplate.exchange(URL_POST_CUSTOMERS,
                HttpMethod.POST,
                bodyRequest,
                new ParameterizedTypeReference<String>(){}
        );
    }
}
