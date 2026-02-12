import { motion } from 'framer-motion';
import { Bot, FileJson, Globe, Zap, Copy, Check, Terminal, Braces, Webhook } from 'lucide-react';
import { useState } from 'react';
import { SpotlightCard } from '../components/spotlight-card';
import { ScrambleText } from '../components/text-reveal';
import { MagneticButton } from '../components/magnetic-button';

const apiEndpoints = [
  {
    method: 'GET',
    path: '/api/v1/animations',
    description: 'Get all animation effects',
    response: `{
  "animations": [
    {
      "id": "glowing-pulse",
      "name": "Glowing Pulse Button",
      "category": "Continuous",
      "code": "..."
    }
  ]
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/gradients',
    description: 'Get all gradient styles',
    response: `{
  "gradients": [
    {
      "id": "mesh-gradient-1",
      "name": "Purple Dream",
      "css": "...",
      "category": "Mesh"
    }
  ]
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/components/{id}',
    description: 'Get specific component by ID',
    response: `{
  "id": "glowing-pulse",
  "name": "Glowing Pulse Button",
  "code": "<motion.button...>",
  "dependencies": ["framer-motion"]
}`,
  },
];

const agentInstructions = `You are an AI assistant with access to UI Hub's design resources.

AVAILABLE RESOURCES:
1. Animation Effects - 10+ copy-paste ready animations
2. Gradient Gallery - 10+ innovative gradient styles

HOW TO USE:
- When user asks for animations, provide the exact code from the animations endpoint
- When user asks for gradients, provide the CSS from the gradients endpoint
- All code is production-ready with TypeScript support
- Components use Framer Motion for animations

BEST PRACTICES:
- Always include proper imports
- Maintain accessibility standards
- Use the design tokens provided
- Ask if user needs customization help`;

const openClawConfig = `{
  "name": "ui-hub-assistant",
  "description": "UI Hub Design Assistant - Provides animations and gradients",
  "version": "1.0.0",
  "endpoints": {
    "animations": "https://ui-hub.dev/api/v1/animations",
    "gradients": "https://ui-hub.dev/api/v1/gradients",
    "components": "https://ui-hub.dev/api/v1/components"
  },
  "capabilities": [
    "animation-effects",
    "gradient-styles",
    "component-library"
  ],
  "auth": {
    "type": "bearer",
    "header": "X-API-Key"
  }
}`;

const mcpServer = `{
  "mcpServers": {
    "ui-hub": {
      "command": "npx",
      "args": ["-y", "@ui-hub/mcp-server"],
      "env": {
        "UI_HUB_API_KEY": "your-api-key"
      }
    }
  }
}`;

function EndpointCard({ endpoint, index }: { endpoint: typeof apiEndpoints[0]; index: number }) {
  const [showResponse, setShowResponse] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(endpoint.response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="border border-border rounded-xl overflow-hidden bg-card"
    >
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-secondary/50 transition-colors"
        onClick={() => setShowResponse(!showResponse)}
      >
        <div className="flex items-center gap-4">
          <span className={`
            px-2 py-1 rounded text-xs font-bold
            ${endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' : ''}
            ${endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-400' : ''}
          `}>
            {endpoint.method}
          </span>
          <code className="text-sm font-mono">{endpoint.path}</code>
        </div>
        <span className="text-sm text-muted-foreground">{endpoint.description}</span>
      </div>
      
      {showResponse && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-border bg-secondary/30"
        >
          <div className="p-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Response</span>
            <motion.button
              onClick={copyCode}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </motion.button>
          </div>
          <pre className="p-4 pt-0 text-sm font-mono text-foreground overflow-x-auto">
            <code>{endpoint.response}</code>
          </pre>
        </motion.div>
      )}
    </motion.div>
  );
}

function CodeBlock({ code, filename }: { code: string; filename: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-mono text-muted-foreground">{filename}</span>
        </div>
        <motion.button
          onClick={copyCode}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </motion.button>
      </div>
      <pre className="p-4 text-sm font-mono text-foreground overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function AgentAccess() {
  return (
    <section id="agent" className="py-32 scroll-mt-16 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border mb-6"
          >
            <Bot className="w-4 h-4 text-linear" />
            <span className="text-sm font-medium text-muted-foreground">
              <ScrambleText text="AI Agent Access" delay={0.3} />
            </span>
          </motion.div>
          
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            Built for AI Agents
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Access our design resources programmatically. Perfect for OpenClaw, 
            Claude, and other AI assistants that need stunning UI components.
          </p>
        </motion.div>

        {/* API Endpoints */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <SpotlightCard className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-linear" />
              <h3 className="font-display text-2xl font-bold">REST API Endpoints</h3>
            </div>
            <div className="space-y-3">
              {apiEndpoints.map((endpoint, index) => (
                <EndpointCard key={endpoint.path} endpoint={endpoint} index={index} />
              ))}
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Integration Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SpotlightCard className="p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <Webhook className="w-6 h-6 text-linear" />
                <h3 className="font-display text-2xl font-bold">OpenClaw Integration</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Add UI Hub to your OpenClaw configuration file. Your AI assistant 
                will have instant access to all animations and gradients.
              </p>
              <CodeBlock code={openClawConfig} filename="openclaw.config.json" />
            </SpotlightCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SpotlightCard className="p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <Braces className="w-6 h-6 text-linear" />
                <h3 className="font-display text-2xl font-bold">MCP Server</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Use the Model Context Protocol (MCP) to connect Claude Desktop 
                or other MCP-compatible clients to UI Hub.
              </p>
              <CodeBlock code={mcpServer} filename="claude_desktop_config.json" />
            </SpotlightCard>
          </motion.div>
        </div>

        {/* System Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SpotlightCard className="p-8 border-linear/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FileJson className="w-6 h-6 text-linear" />
                <h3 className="font-display text-2xl font-bold">Agent System Instructions</h3>
              </div>
              <MagneticButton
                onClick={() => navigator.clipboard.writeText(agentInstructions)}
                className="px-4 py-2 rounded-lg bg-linear text-white font-medium hover:bg-linear/90 transition-colors"
              >
                Copy Instructions
              </MagneticButton>
            </div>
            
            <div className="bg-secondary/30 rounded-xl p-6 border border-border">
              <pre className="text-sm font-mono text-foreground whitespace-pre-wrap leading-relaxed">
                <span className="text-linear font-bold">You are an AI assistant with access to UI Hub&apos;s design resources.</span>
                {'\n\n'}
                <span className="text-purple-400 font-bold">AVAILABLE RESOURCES:</span>
                {'\n'}1. Animation Effects - 10+ copy-paste ready animations
                {'\n'}2. Gradient Gallery - 10+ innovative gradient styles
                {'\n\n'}
                <span className="text-purple-400 font-bold">HOW TO USE:</span>
                {'\n'}- When user asks for animations, provide the exact code from the animations endpoint
                {'\n'}- When user asks for gradients, provide the CSS from the gradients endpoint
                {'\n'}- All code is production-ready with TypeScript support
                {'\n'}- Components use Framer Motion for animations
                {'\n\n'}
                <span className="text-purple-400 font-bold">BEST PRACTICES:</span>
                {'\n'}- Always include proper imports
                {'\n'}- Maintain accessibility standards
                {'\n'}- Use the design tokens provided
                {'\n'}- Ask if user needs customization help
              </pre>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-linear/10 via-purple-500/10 to-pink-500/10 border border-linear/20">
            <Zap className="w-8 h-8 text-linear" />
            <div className="text-left">
              <p className="font-bold text-lg">Ready to integrate?</p>
              <p className="text-muted-foreground">All endpoints are free and require no authentication</p>
            </div>
            <MagneticButton
              href="https://api.ui-hub.dev/docs"
              className="ml-4 px-6 py-3 rounded-xl bg-linear text-white font-semibold hover:bg-linear/90 transition-colors"
            >
              View API Docs
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
