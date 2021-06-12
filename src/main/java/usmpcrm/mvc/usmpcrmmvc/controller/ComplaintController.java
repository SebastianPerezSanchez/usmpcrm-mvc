package usmpcrm.mvc.usmpcrmmvc.controller;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.ui.Model;

import usmpcrm.mvc.usmpcrmmvc.dto.Complaint;
import usmpcrm.mvc.usmpcrmmvc.service.GDHService;

import org.springframework.validation.BindingResult;

@Controller
public class ComplaintController {
    
    private final GDHService gdhService;
    private static final String COMPLAINT_INDEX = "complaint/index";
    private static final String COMPLAINT_CREATE ="complaint/create"; 
    private static String MODEL_COMPLAINT="complaint";


    public ComplaintController(GDHService gdhService) {
        this.gdhService = gdhService;
    }

    @GetMapping(COMPLAINT_INDEX)
    public String index(Model model) {
        List<Complaint> com = gdhService.getValidComplaints();
        model.addAttribute("complaints", com);
        return COMPLAINT_INDEX;
    }

    @GetMapping(COMPLAINT_CREATE)
    public String create(Model model) {
        model.addAttribute(MODEL_COMPLAINT, new Complaint());
        return COMPLAINT_CREATE;
    }    

    @PostMapping(COMPLAINT_CREATE)
    public String createSubmitForm(Model model, 
        Complaint objComplaint, BindingResult res){
        if(res.hasFieldErrors()) {
            model.addAttribute("mensaje", "No se realizó el reclamo correctamente");
        }else{
            gdhService.addValidComplaint(objComplaint);
            model.addAttribute(MODEL_COMPLAINT, objComplaint);
            model.addAttribute("mensaje", "Reclamo correctamente registrado");
        }
        return COMPLAINT_CREATE;
    }

}
