package com.google.training.helloworld;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class HelloClass {
    public String message = "Hello World";

    public HelloClass () {
    }

    public HelloClass (String name) {
        this.message = "Hello " + name + "!";
    }

    public HelloClass(String name, String period) {
    	this.message = "Hello " + name + " " + period + "!";
	}

	public HelloClass(int i) {
		try {
			sendGet();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	// HTTP GET request
		private void sendGet() throws Exception {

			String url = "http://thecatapi.com/api/images/get?format=html";
			
			URL obj = new URL(url);
			HttpURLConnection con = (HttpURLConnection) obj.openConnection();

			// optional default is GET
			con.setRequestMethod("GET");

			//add request header
			con.setRequestProperty("User-Agent", "Mozilla/5.0");

			int responseCode = con.getResponseCode();

			BufferedReader in = new BufferedReader(
			        new InputStreamReader(con.getInputStream()));
			String inputLine;
			StringBuffer response = new StringBuffer();

			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
			in.close();

			//print result
			this.message = response.toString();

		}

	public String getMessage() {
        return message;
    }
}
