import axios from 'axios';

const VAPI_API_URL = 'https://api.vapi.ai';
const PUBLIC_API_KEY = '9cce595e-1492-4671-a13e-c0784f4366cf';

// Configure axios instance with default headers
const vapiAxios = axios.create({
  baseURL: VAPI_API_URL,
  headers: {
    'Authorization': `Bearer ${PUBLIC_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

interface VapiAssistant {
  id: string;
  name: string;
  firstMessage: string;
  firstMessageMode: 'assistant-speaks-first' | 'user-speaks-first';
  voice: {
    provider: string;
    voiceId: string;
  };
  model: {
    provider: string;
    model: string;
  };
}

const vapiService = {
  createAssistant: async (assistantData: {
    name: string;
    firstMessage: string;
    firstMessageMode?: 'assistant-speaks-first' | 'user-speaks-first';
    voice?: {
      provider: string;
      voiceId: string;
    };
    model?: {
      provider: string;
      model: string;
    };
  }): Promise<VapiAssistant> => {
    try {
      const { data } = await vapiAxios.post<VapiAssistant>('/assistant', {
        ...assistantData,
        firstMessageMode: assistantData.firstMessageMode || 'assistant-speaks-first',
        voice: assistantData.voice || {
          provider: 'eleven_labs',
          voiceId: 'rachel'
        },
        model: assistantData.model || {
          provider: 'openai',
          model: 'gpt-4'
        }
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to create assistant: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  },

  listAssistants: async (): Promise<VapiAssistant[]> => {
    try {
      const { data } = await vapiAxios.get<VapiAssistant[]>('/assistant');
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to list assistants: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  },

  getAssistant: async (assistantId: string): Promise<VapiAssistant> => {
    try {
      const { data } = await vapiAxios.get<VapiAssistant>(`/assistant/${assistantId}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to get assistant: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }
};

export default vapiService; 