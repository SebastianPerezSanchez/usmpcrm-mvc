package usmpcrm.mvc.usmpcrmmvc.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.ui.Model;

import usmpcrm.mvc.usmpcrmmvc.dto.Customer;
import usmpcrm.mvc.usmpcrmmvc.service.GDHService;

import org.springframework.validation.BindingResult;

@Controller
public class CustomerController {
    
    private final GDHService gdhService;
    private static final String CUSTOMER_INDEX = "customer/index";
    private static final String CUSTOMER_CREATE ="customer/create"; 
    private static String MODEL_CUSTOMER="customer";


    public CustomerController(GDHService gdhService) {
        this.gdhService = gdhService;
    }

    @GetMapping(CUSTOMER_INDEX)
    public String index(Model model) {
        List<Customer> cus = gdhService.getValidCustomers();
        model.addAttribute("customers", cus);
        return CUSTOMER_INDEX;
    }

    @GetMapping(CUSTOMER_CREATE)
    public String create(Model model) {
        model.addAttribute(MODEL_CUSTOMER, new Customer());
        return CUSTOMER_CREATE;
    }    

    @PostMapping(CUSTOMER_CREATE)
    public String createSubmitForm(Model model, 
        Customer objCustomer, BindingResult result){
        if(result.hasFieldErrors()) {
            model.addAttribute("mensaje", "No se realizó el registrado de cliente");
        }else{
            gdhService.addValidCustomer(objCustomer);
            model.addAttribute(MODEL_CUSTOMER, objCustomer);
            model.addAttribute("mensaje", "Cliente correctamente registrado");
        }
        return CUSTOMER_CREATE;
    }

}
