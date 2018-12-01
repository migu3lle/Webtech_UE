package Assignment01;

import java.io.*;
import java.net.Socket;

/**
 * Created by Gundacker Michael (1646765) on 02/10/2018
 */

public class ClientSocket extends Socket {

    private static Socket socket;
    private static PrintWriter out;
    private static BufferedReader in;

    public static void main(String[] args) {
        if(args.length < 2) //Check arguments
            throw new IllegalArgumentException("Check parameter! e.g. run ClientSocket <server> <port>");

        String hostname = args[0];  //Get hostname from argument 1
        int port = Integer.parseInt(args[1]);   //Get port from argument 2

        try{
            socket = new Socket(hostname, port);    //Create new Client Socket
            out = new PrintWriter(socket.getOutputStream(), true);  //Create PrintWriter for our socket (here with autoFlush)
            in = new BufferedReader(new InputStreamReader(socket.getInputStream()));    //Create BufferedReader for our socket
        }
        catch (IOException e){
            System.out.println("Error on initialization occured..");
        }
        /*
        Send GET request via our socket
        - one line GET request, here just root ressource (HTTP/1.1)
        - one line with hostname, in case multiple hosts run on the contacted server
        - referrer, since connection to google.at returned "invalid request: referrer-Policy: no-referrer"
         */
        out.println("GET / HTTP/1.1\n" + "Host: " + hostname + "\nReferrer: www.aau.at\n\n");

        String stringRead;

        try {
            while ((stringRead = in.readLine()) != null) {
                System.out.println(stringRead);     //Read and print response from server
            }
            in.close();   //Close BufferedReader
        }
        catch (IOException e){
            System.out.println("Error occured...");
        }
    }

}
