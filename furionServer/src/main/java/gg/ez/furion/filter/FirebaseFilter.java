package gg.ez.furion.filter;

import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseToken;
import gg.ez.furion.service.FirebaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@Order(2)
public class FirebaseFilter implements Filter {

    private final static Logger logger = LoggerFactory.getLogger(LoggingFilter.class);

    @Autowired
    private FirebaseService firebaseService;

    public FirebaseFilter(FirebaseService firebaseService) {
        this.firebaseService = firebaseService;
        try {
            this.firebaseService.initialize();
        } catch (Exception err) {
            logger.error("Firebase Initialization failed : {}", err.toString());
        }
    }

    private boolean bearerTokenIsRequired (String path, HttpServletRequest req) {
        if (path.startsWith("/api/users/auth") || req.getMethod().equals("OPTIONS"))
            return false;
        return true;
    }

    @Override
    public void doFilter (ServletRequest request, ServletResponse response, FilterChain chain) {
        try {
            HttpServletRequest req = (HttpServletRequest) request;
            String path = req.getRequestURI();
            assert path.startsWith("/api");

            if (bearerTokenIsRequired(path, req)) {
                String authorizationHeader = req.getHeader("Authorization");
                assert authorizationHeader != null;
                assert authorizationHeader.startsWith("Bearer");
                String bearerToken = authorizationHeader.substring(7, authorizationHeader.length());

                assert !FirebaseApp.getApps().isEmpty();
                FirebaseToken decodedToken = this.firebaseService.verifyToken(bearerToken);

                logger.info ("Firebase Token verified.");
            }
            chain.doFilter(request, response);
        } catch (Exception err) {
            // TODO catch IOException and ServletException separately
            // TODO send HTTP error code
            // TODO handle Assertion error
            // TODO handle FirebaseAuthException
            err.printStackTrace();
            logger.error ("Firebase Filter Error: {}", err.toString());

            HttpServletResponse resp = (HttpServletResponse) response;
            resp.reset();
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

            // TODO add appropriate error message
//            String error = "Invalid API KEY";
//            response.setContentLength(error .length());
//            response.getWriter().write(error);
        }
    }
}
