import packageJson from "../../package.json" with { type: "json" };
import { ApiReferenceConfiguration } from "@scalar/express-api-reference";
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "../utils/util.js";

const options = {
    openapi: "3.1.0",
    info: {
      title: packageJson?.name,
      version: packageJson?.version,
    }
};

export function generateApiReference(): Partial<ApiReferenceConfiguration> {
    const generator = new OpenApiGeneratorV3(registry.definitions);
    return {
        theme: "purple",
        content: generator.generateDocument(options),
    };
}