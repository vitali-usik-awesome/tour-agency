package by.bntu.controllers;

import by.bntu.model.Greeting;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;

/**
 * Created by v.usik on 2/23/2016.
 */
@RestController
@EnableAutoConfiguration
public class GreetingController {

  private static final String template = "Hello, %s!";
  private final AtomicLong counter = new AtomicLong();

  @RequestMapping(method= RequestMethod.GET, value="/greeting")
  public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
    System.out.println("smth");
    return new Greeting(counter.incrementAndGet(),
        String.format(template, name));
  }

}
