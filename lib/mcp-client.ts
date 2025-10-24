import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

let mcpClient: Client | null = null;

export async function getMCPClient() {
  if (mcpClient) {
    return mcpClient;
  }

  // Create transport to communicate with Reactinator MCP server
  const transport = new StdioClientTransport({
    command: "node",
    args: ["/Users/kcdacre8tor/reactinator/index.js"],
  });

  // Create and initialize the client
  mcpClient = new Client(
    {
      name: "kre8sites-client",
      version: "1.0.0",
    },
    {
      capabilities: {},
    }
  );

  await mcpClient.connect(transport);

  return mcpClient;
}

export async function callReactinatorTool(
  toolName: string,
  args: Record<string, unknown>
) {
  const client = await getMCPClient();

  const result = await client.callTool({
    name: toolName,
    arguments: args,
  });

  return result;
}
