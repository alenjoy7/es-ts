import packageJson from "../../package.json" with { type: "json" };
import { ApiReferenceConfiguration } from "@scalar/express-api-reference";
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "../utils/util.js";

const options = {
    openapi: "3.0.0",
    info: {
      title: packageJson?.name,
      version: packageJson?.version,
    }
};

const generator = new OpenApiGeneratorV3(registry.definitions);

export const apiReferenceOptions:Partial<ApiReferenceConfiguration> = {
    theme: "purple",
    spec: {
      content: generator.generateDocument(options),
    },
  }