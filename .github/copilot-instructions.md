# ioBroker Adapter Development with GitHub Copilot

**Version:** 0.4.0
**Template Source:** https://github.com/DrozmotiX/ioBroker-Copilot-Instructions

This file contains instructions and best practices for GitHub Copilot when working on ioBroker adapter development.

## Project Context

You are working on an ioBroker adapter. ioBroker is an integration platform for the Internet of Things, focused on building smart home and industrial IoT solutions. Adapters are plugins that connect ioBroker to external systems, devices, or services.

## Adapter-Specific Context
- **Adapter Name**: iobroker.vis-justgage
- **Primary Function**: justGage Widgets for ioBroker.vis - provides customizable gauge visualizations for smart home dashboards
- **Type**: visualization-widgets adapter (mode: none, onlyWWW: true)
- **Key Dependencies**: JustGage library, Raphael.js for SVG graphics
- **Target Integration**: Works with ioBroker.vis and vis-2 for creating gauge displays
- **Configuration**: No config required - widgets are configured directly in vis editor
- **Key Features**: 
  - Customizable gauge appearance (colors, ranges, animations)
  - Support for value inversion
  - Multiple gauge types and styling options
  - Real-time data binding from ioBroker states

## Testing

### Unit Testing
- Use Jest as the primary testing framework for ioBroker adapters
- Create tests for all adapter main functions and helper methods
- Test error handling scenarios and edge cases
- Mock external API calls and hardware dependencies
- For adapters connecting to APIs/devices not reachable by internet, provide example data files to allow testing of functionality without live connections
- Example test structure:
  ```javascript
  describe('AdapterName', () => {
    let adapter;
    
    beforeEach(() => {
      // Setup test adapter instance
    });
    
    test('should initialize correctly', () => {
      // Test adapter initialization
    });
  });
  ```

### Integration Testing

**IMPORTANT**: Use the official `@iobroker/testing` framework for all integration tests. This is the ONLY correct way to test ioBroker adapters.

**Official Documentation**: https://github.com/ioBroker/testing

#### Framework Structure
Integration tests MUST follow this exact pattern:

```javascript
const path = require('path');
const { tests } = require('@iobroker/testing');

// Define test coordinates or configuration
const TEST_COORDINATES = '52.520008,13.404954'; // Berlin
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

// Use tests.integration() with defineAdditionalTests
tests.integration(path.join(__dirname, '..'), {
    defineAdditionalTests({ suite }) {
        suite('Test adapter with specific configuration', (getHarness) => {
            let harness;

            before(() => {
                harness = getHarness();
            });

            it('should configure and start adapter', function () {
                return new Promise(async (resolve, reject) => {
                    try {
                        harness = getHarness();
                        
                        // Get adapter object using promisified pattern
                        const obj = await new Promise((res, rej) => {
                            harness.objects.getObject('system.adapter.your-adapter.0', (err, o) => {
                                if (err) return rej(err);
                                res(o);
                            });
                        });
                        
                        if (!obj) {
                            return reject(new Error('Adapter object not found'));
                        }

                        // Configure adapter properties
                        Object.assign(obj.native, {
                            position: TEST_COORDINATES,
                            createCurrently: true,
                            createHourly: true,
                            createDaily: true,
                            // Add other configuration as needed
                        });

                        // Set the updated configuration
                        harness.objects.setObject(obj._id, obj);

                        console.log('✅ Step 1: Configuration written, starting adapter...');
                        
                        // Start adapter and wait
                        await harness.startAdapterAndWait();
                        
                        console.log('✅ Step 2: Adapter started');

                        // Wait for adapter to process data
                        const waitMs = 15000;
                        await wait(waitMs);

                        console.log('🔍 Step 3: Checking states after adapter run...');
                        
                        // Check for expected states creation
                        const states = await harness.states.getKeysAsync('your-adapter.0.*');
                        
                        console.log(`Found ${states.length} states created by adapter`);
                        
                        if (states.length === 0) {
                            return reject(new Error('Expected adapter to create states, but none were found'));
                        }
                        
                        // Check specific state values
                        for (const stateId of states.slice(0, 5)) { // Check first 5 states
                            const state = await harness.states.getStateAsync(stateId);
                            if (state) {
                                console.log(`✓ State ${stateId}: ${state.val} (${typeof state.val})`);
                            }
                        }
                        
                        console.log('✅ Integration test completed successfully');
                        resolve();
                        
                    } catch (error) {
                        console.error('❌ Integration test failed:', error);
                        reject(error);
                    }
                });
            }).timeout(60000); // Extended timeout for integration tests
        });
    }
});
```

#### Testing Configuration
- Integration tests should validate adapter functionality end-to-end
- Use realistic test data and configurations
- Test both successful operations and error scenarios
- Verify state creation and proper data formatting
- Ensure proper cleanup after tests

#### Widget-Specific Testing for vis-justgage
```javascript
// For visualization widgets, test widget file structure and dependencies
describe('Widget Files', () => {
  test('should have required widget files', () => {
    expect(fs.existsSync('widgets/justgage.html')).toBe(true);
    expect(fs.existsSync('widgets/justgage/js/justgage.js')).toBe(true);
  });
  
  test('should load JustGage library', () => {
    // Test library loading and basic functionality
    const widgetContent = fs.readFileSync('widgets/justgage.html', 'utf8');
    expect(widgetContent).toContain('justgage');
  });
});
```

## JavaScript/TypeScript Development

### Core Patterns for ioBroker Adapters

#### Adapter Class Structure
```javascript
class YourAdapter extends utils.Adapter {
    constructor(options = {}) {
        super({
            ...options,
            name: 'your-adapter',
        });
        this.on('ready', this.onReady.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }
    
    async onReady() {
        // Adapter initialization code
        this.setState('info.connection', true, true);
    }
    
    onUnload(callback) {
        try {
            // Clean shutdown logic
            this.setState('info.connection', false, true);
            callback();
        } catch (e) {
            callback();
        }
    }
}
```

#### State Management
```javascript
// Create states with proper configuration
await this.setObjectNotExistsAsync('device.value', {
    type: 'state',
    common: {
        name: 'Value',
        type: 'number',
        role: 'value',
        read: true,
        write: false,
    },
    native: {},
});

// Set state values with quality and timestamp
await this.setStateAsync('device.value', { val: 42, ack: true });
```

#### Error Handling
```javascript
try {
    const result = await this.someAsyncOperation();
    await this.setStateAsync('status', 'success');
} catch (error) {
    this.log.error(`Operation failed: ${error.message}`);
    await this.setStateAsync('status', 'error');
    // Don't throw unless critical - let adapter continue
}
```

### Widget Development for ioBroker.vis

#### Widget Definition Structure
```javascript
// Widget definition in HTML file
if (typeof vis !== 'undefined') {
    vis.widgets.justgage = {
        version: "2.1.7",
        showVersion: function () {
            if (vis.binds.justgage.version) {
                console.log('vis.binds.justgage.version=' + vis.binds.justgage.version);
            }
        }
    };
}
```

#### Widget Configuration
```javascript
// Widget attributes configuration
vis.binds.justgage = {
    version: "2.1.7",
    createWidget: function (widgetID, view, data, style) {
        var $div = $('#' + widgetID);
        // Widget implementation
        var g = new JustGage({
            id: widgetID + '_content',
            value: data.value,
            min: data.min,
            max: data.max,
            title: data.title
        });
    }
};
```

## Error Handling and Logging

### Logging Best Practices
```javascript
// Use appropriate log levels
this.log.error('Critical error that prevents operation');
this.log.warn('Warning about potential issues');
this.log.info('General information about operation');
this.log.debug('Detailed debugging information');

// Include context in log messages
this.log.info(`Processing device ${deviceId} with value ${value}`);
this.log.error(`Failed to connect to API: ${error.message}`, error.stack);
```

### Error Recovery
```javascript
// Implement retry logic for transient failures
async function withRetry(operation, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await operation();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            this.log.warn(`Attempt ${i + 1} failed, retrying...`);
            await this.delay(1000 * (i + 1)); // Exponential backoff
        }
    }
}
```

### Proper Cleanup
```javascript
onUnload(callback) {
  try {
    // Clear all timers and intervals
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = undefined;
    }
    
    // Close connections and clean up resources
    if (this.client) {
      this.client.disconnect();
      this.client = undefined;
    }
    
    // Set connection state to false
    this.setState('info.connection', false, true);
    
    callback();
  } catch (e) {
    // Always call callback even if cleanup fails
    callback();
  }
}
```

## JSON-Config Management

### Configuration Schema
```javascript
// In io-package.json - define configuration schema
"native": {
    "option1": "defaultValue",
    "option2": 42,
    "option3": true
},
"jsonConfig": {
    "type": "panel",
    "items": {
        "option1": {
            "type": "text",
            "label": "Option 1"
        }
    }
}
```

### Using Configuration in Code
```javascript
async onReady() {
    // Access configuration values
    const option1 = this.config.option1;
    const option2 = this.config.option2;
    
    // Validate configuration
    if (!option1) {
        this.log.error('Option1 is required but not configured');
        return;
    }
}
```

## ioBroker-Specific Patterns

### State Subscriptions
```javascript
// Subscribe to state changes
this.subscribeStates('*');

// Handle state changes
onStateChange(id, state) {
    if (state) {
        this.log.info(`State ${id} changed: ${state.val} (ack = ${state.ack})`);
        
        // Only process non-acknowledged changes (user input)
        if (!state.ack) {
            this.handleUserInput(id, state.val);
        }
    } else {
        this.log.info(`State ${id} deleted`);
    }
}
```

### Object Management
```javascript
// Create objects with proper structure
await this.setObjectNotExistsAsync('device.channel', {
    type: 'channel',
    common: {
        name: 'Device Channel'
    },
    native: {}
});

// Extend existing objects
await this.extendObjectAsync('device.state', {
    common: {
        min: 0,
        max: 100
    }
});
```

## Code Style and Standards

- Follow JavaScript/TypeScript best practices
- Use async/await for asynchronous operations
- Implement proper resource cleanup in `unload()` method
- Use semantic versioning for adapter releases
- Include proper JSDoc comments for public methods

## CI/CD and Testing Integration

### GitHub Actions for Widget Testing
For widget adapters, implement testing that validates widget files:

```yaml
# Tests widget structure and dependencies
widget-tests:
  runs-on: ubuntu-22.04
  
  steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Use Node.js 20.x
      uses: actions/setup-node@v4
      with:
        node-version: 20.x
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run widget tests
      run: npm run test:widgets
```

### CI/CD Best Practices
- Run tests on ubuntu-22.04 for consistency
- Use Node.js 20.x as the current LTS version
- Test widget loading and basic functionality
- Validate HTML structure and JavaScript syntax
- Check for required dependencies and library loading

### Package.json Script Integration
Add dedicated script for widget testing:
```json
{
  "scripts": {
    "test:widgets": "mocha test/widget --exit"
  }
}
```

### Practical Example: Widget Testing Implementation
```javascript
const path = require("path");
const fs = require("fs");
const { expect } = require("chai");

describe("Widget Files", () => {
    it("Should have main widget HTML file", () => {
        const widgetPath = path.join(__dirname, "../widgets/justgage.html");
        expect(fs.existsSync(widgetPath)).to.be.true;
    });

    it("Should have widget JavaScript files", () => {
        const jsPath = path.join(__dirname, "../widgets/justgage/js/justgage.js");
        expect(fs.existsSync(jsPath)).to.be.true;
    });

    it("Should contain valid widget definition", () => {
        const widgetPath = path.join(__dirname, "../widgets/justgage.html");
        const content = fs.readFileSync(widgetPath, "utf8");
        
        expect(content).to.contain("vis.widgets.justgage");
        expect(content).to.contain("createWidget");
    });
});
```

## Widget-Specific Development Guidelines

### JustGage Integration
```javascript
// Proper JustGage widget initialization
vis.binds.justgage.createWidget = function (widgetID, view, data, style) {
    var $div = $('#' + widgetID);
    if (!$div.length) return;

    // Clean up existing gauge
    $div.find('.justgage').remove();
    
    // Create new gauge with proper configuration
    var gauge = new JustGage({
        id: widgetID + '_gauge',
        parentNode: $div[0],
        value: parseFloat(data.value) || 0,
        min: parseFloat(data.min) || 0,
        max: parseFloat(data.max) || 100,
        title: data.title || '',
        titleFontColor: data.titleFontColor || '#999',
        valueFontColor: data.valueFontColor || '#010101',
        gaugeWidthScale: parseFloat(data.gaugeWidthScale) || 1.0,
        counter: data.counter === true
    });
    
    // Store gauge reference for updates
    $div.data('gauge', gauge);
};
```

### Widget State Updates
```javascript
// Update widget when data changes
vis.binds.justgage.onStateChange = function (e, newVal, oldVal) {
    var $div = $(this);
    var gauge = $div.data('gauge');
    
    if (gauge && newVal !== null && newVal !== undefined) {
        var value = parseFloat(newVal);
        if (!isNaN(value)) {
            gauge.refresh(value);
        }
    }
};
```