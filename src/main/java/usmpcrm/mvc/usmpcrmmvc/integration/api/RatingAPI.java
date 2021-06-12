package usmpcrm.mvc.usmpcrmmvc.integration.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import usmpcrm.mvc.usmpcrmmvc.dto.Rating;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class RatingAPI {
    
    @Value("${appexternal.endpoint.get.ratings}")
    private String URL_GET_RATINGS;

    @Value("${appexternal.endpoint.post.ratings}")
    private String URL_POST_RATINGS;

    private RestTemplate restTemplate;

    public RatingAPI(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }

    public List<Rating> getRatings(){
        ResponseEntity<List<Rating>> response = restTemplate.
                                    exchange(URL_GET_RATINGS,
                                    HttpMethod.GET,
                                    HttpEntity.EMPTY,
                                    new ParameterizedTypeReference<List<Rating>>(){});
        return response.getBody();
    }

    public void postRatings(Rating r){
        HttpEntity<Rating> bodyRequest = new  HttpEntity<Rating>(r);
        restTemplate.exchange(URL_POST_RATINGS,
                HttpMethod.POST,
                bodyRequest,
                new ParameterizedTypeReference<String>(){}
        );
    }
}
