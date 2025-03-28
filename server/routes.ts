import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = contactSchema.parse(req.body);
      
      // In a real application, you would:
      // 1. Save the contact submission to a database
      // 2. Send an email notification
      // 3. Perhaps create a task in a CRM system
      
      // For this demo, we'll just log the data and return success
      console.log("Contact form submission:", validatedData);
      
      // Return success
      res.status(200).json({ 
        success: true, 
        message: "Thank you for your message. We'll get back to you shortly!" 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while processing your request. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
