package Lab6;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Enumeration;
import java.net.InetAddress;

/**
 * Servlet implementation class InfoServlet
 */
@WebServlet("/info.do")
public class InfoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InfoServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		PrintWriter pw = new PrintWriter(response.getWriter());
		pw.println("<!DOCTYPE html><html><head><meta charset=\"ISO-8859-1\"><title>DonalM Lab 6</title>"
				+ "<style> .WHITE{color: white;}.RED{color: red;}.BLACK{background: black;}.GREEN{color: lawngreen;}</style></head>");
		pw.println("<body class=\"BLACK\"><h1 class=\"WHITE\">System Info</h1>");
		pw.println("<p class=\"WHITE\">The current data and time is " + new Date().toString() +"</p>" );
		pw.println("<p class=\"WHITE\">The current thread is " + Thread.currentThread().getId() + "</p>");
		pw.println("<p class=\"WHITE\">The current java.home is "+System.getProperty("java.home")+"</p>");
		pw.println("<p class=\"WHITE\">The current version is " + System.getProperty("java.vm.specification.version") +"</p>");
		pw.println("<p class=\"WHITE\">The current java.runtime.name is " + System.getProperty("java.specification.name") +"</p>");
		pw.println("<p class=\"WHITE\">The current java.runtime.version is " +System.getProperty("java.specification.version") + "</p>");
		pw.println("<p class=\"WHITE\">The current java.specification.version is  " + System.getProperty("java.vm.specification.version") +"</p>");
		pw.println("<p class=\"WHITE\">The current java.vm.version is " + System.getProperty("java.vm.version") +"</p>");
		pw.println("<p class=\"WHITE\">The current os name is " +System.getProperty("os.name") +"</p>");
		pw.println("<h1 class=\"RED\">HTTP Headers</h1>");
		Enumeration<String> headerNames = request.getHeaderNames();
		while(headerNames.hasMoreElements()) {
			String headerName = (String) headerNames.nextElement();
			String headerValue = request.getHeader(headerName);
			pw.println("<p class=\"RED\">"+headerName+" : "+headerValue+"</p>");
		}
		pw.println("<h1 class=\"GREEN\">Request Parameters</h1>");
		//todo how do you now what to put here
		Enumeration<String> params = request.getParameterNames();
		while(params.hasMoreElements()) {
			String name = (String)params.nextElement();
			String values = request.getParameter(name);
			//todo what do you do after this
			pw.println("<p class=\"GREEN\">"+name+" : "+values+"</p>");
		}
		pw.println("</body></html>");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
