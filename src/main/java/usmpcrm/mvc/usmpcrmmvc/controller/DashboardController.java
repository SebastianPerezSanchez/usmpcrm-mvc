package usmpcrm.mvc.usmpcrmmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {
    

    @GetMapping("/dashboard/index")
    public String index() {
        return "dashboard/index";
    }

    @GetMapping("/dashboard/customer")
    public String customer(){
        return "dashboard/customer";
    }

    @GetMapping("/dashboard/complaint")
    public String complaint(){
        return "dashboard/complaint";
    }

    @GetMapping("/dashboard/rating")
    public String rating(){
        return "dashboard/rating";
    }


}
