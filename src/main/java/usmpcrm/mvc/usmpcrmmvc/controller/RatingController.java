package usmpcrm.mvc.usmpcrmmvc.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.ui.Model;

import usmpcrm.mvc.usmpcrmmvc.dto.Rating;
import usmpcrm.mvc.usmpcrmmvc.service.GDHService;

import org.springframework.validation.BindingResult;

@Controller
public class RatingController {
    
    private final GDHService gdhService;
    private static final String RATING_INDEX = "rating/index";
    private static final String RATING_CREATE ="rating/create"; 
    private static String MODEL_RATING="rating";


    public RatingController(GDHService gdhService) {
        this.gdhService = gdhService;
    }

    @GetMapping(RATING_INDEX)
    public String index(Model model) {
        List<Rating> ratings = gdhService.getValidRatings();
        model.addAttribute("ratings", ratings);
        return RATING_INDEX;
    }

    @GetMapping(RATING_CREATE)
    public String create(Model model) {
        model.addAttribute(MODEL_RATING, new Rating());
        return RATING_CREATE;
    }    

    @PostMapping(RATING_CREATE)
    public String createSubmitForm(Model model, 
        Rating objRating, BindingResult result){
        if(result.hasFieldErrors()) {
            model.addAttribute("mensaje", "No se realizó el rating");
        }else{
            gdhService.addValidRating(objRating);
            model.addAttribute(MODEL_RATING, objRating);
            model.addAttribute("mensaje", "Rating y comentarios enviados correctamente");
        }
        return RATING_CREATE;
    }

}
