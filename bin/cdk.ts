#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkTemplateStack } from '../lib/cdk-template-stack';

const app = new cdk.App();
new CdkTemplateStack(app, 'CdkTemplateStack');
