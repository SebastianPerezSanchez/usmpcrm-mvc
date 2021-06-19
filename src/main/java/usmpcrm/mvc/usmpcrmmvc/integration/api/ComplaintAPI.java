package usmpcrm.mvc.usmpcrmmvc.integration.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import usmpcrm.mvc.usmpcrmmvc.dto.Complaint;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ComplaintAPI {
    
    @Value("${appexternal.endpoint.get.complaints}")
    private String URL_GET_COMPLAINTS;

    @Value("${appexternal.endpoint.post.complaints}")
    private String URL_POST_COMPLAINTS;

    private RestTemplate restTemplate;

    public ComplaintAPI(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }

    public List<Complaint> getComplaints(){
        ResponseEntity<List<Complaint>> response = restTemplate.
                                    exchange(URL_GET_COMPLAINTS,
                                    HttpMethod.GET,
                                    HttpEntity.EMPTY,
                                    new ParameterizedTypeReference<List<Complaint>>(){});
        return response.getBody();
    }

    public void postComplaints(Complaint c){
        HttpEntity<Complaint> bodyRequest = new  HttpEntity<Complaint>(c);
        restTemplate.exchange(URL_POST_COMPLAINTS,
                HttpMethod.POST,
                bodyRequest,
                new ParameterizedTypeReference<String>(){}
        );
    }
}
