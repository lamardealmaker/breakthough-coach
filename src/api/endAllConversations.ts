import { endConversation } from "./endConversation";

interface Conversation {
  conversation_id: string;
  status: string;
}

interface ConversationsResponse {
  data: Conversation[];
}

export const endAllConversations = async (token: string): Promise<void> => {
  try {
    console.log("Attempting to end all active conversations...");
    
    // First, list all conversations
    const listResponse = await fetch("https://tavusapi.com/v2/conversations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": token ?? "",
      },
    });

    if (!listResponse.ok) {
      const errorText = await listResponse.text();
      console.error("Failed to list conversations:", errorText);
      throw new Error(`Failed to list conversations: ${errorText}`);
    }

    const conversationsData: ConversationsResponse = await listResponse.json();
    console.log(`Found ${conversationsData.data.length} conversations`);
    
    // Filter for active conversations
    const activeConversations = conversationsData.data.filter(
      (conv) => conv.status === "active"
    );
    
    console.log(`Found ${activeConversations.length} active conversations to end`);
    
    // End each active conversation
    const endPromises = activeConversations.map((conv) => 
      endConversation(token, conv.conversation_id)
        .then(() => console.log(`Successfully ended conversation ${conv.conversation_id}`))
        .catch((error) => console.error(`Failed to end conversation ${conv.conversation_id}:`, error))
    );
    
    await Promise.all(endPromises);
    console.log("All active conversations have been ended");
    
  } catch (error) {
    console.error("Error ending all conversations:", error);
    throw error;
  }
}; 