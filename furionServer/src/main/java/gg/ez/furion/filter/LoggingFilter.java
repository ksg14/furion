package gg.ez.furion.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Component
@Order(1)
public class LoggingFilter implements Filter {

    private final static Logger logger = LoggerFactory.getLogger(LoggingFilter.class);

    @Override
    public void doFilter (ServletRequest request,
                          ServletResponse response,
                          FilterChain filterChain)  {

        try {
            HttpServletRequest req = (HttpServletRequest) request;
            HttpServletResponse res = (HttpServletResponse) response;

            logger.info("Logging Request  {} : {}",
                    req.getMethod(),
                    req.getRequestURI());

            filterChain.doFilter (request,
                    response);

            logger.info("Logging Response {} : {} {}",
                    req.getMethod(),
                    req.getRequestURI(),
                    res.getContentType());

        } catch (Exception err) {
            // TODO catch IOException and ServletException separately
            // TODO send HTTP error code
            logger.error ("Logging Filter Error: {}", err.toString());
        }
    }
}
