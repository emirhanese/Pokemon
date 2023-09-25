package tech.obss.jip.pokemon.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import tech.obss.jip.pokemon.dto.ErrorDTO;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {ApplicationException.class})
    @ResponseBody
    public ResponseEntity<ErrorDTO> handleException(ApplicationException ex) {
        return ResponseEntity.status(ex.getCode())
                .body(ErrorDTO.builder()
                        .message(ex.getMessage()).build());
    }
}
