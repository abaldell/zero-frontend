
import type { ReporterStep, TestStepNode } from "../types/reporterTest.type";
import type { TestResult } from "../types/test.type";
import { getApiFiles, getApiResults } from "./Utils";


export async function loadPlaywrightResults() {
    const results = await fetch(getApiResults());
    if (!results.ok) {
        throw new Error(`No se pudo cargar el reporte: ${results.status}`);
    }
    const data = await results.json();
    return data;
}

function collectSpecs(suite: any,specs: any[] = []): any[] {

    if (suite.specs?.length) {
        specs.push(...suite.specs);
    }

    if (suite.suites?.length) {
        suite.suites.forEach((child: any) => {
        collectSpecs(child, specs);
        });
    }

    return specs;
}

export function getAllSpecs(report: any) {
    const specs: any[] = [];
    if (!Array.isArray(report?.suites)) {
        return specs;
    }

    report.suites.forEach((suite: any) => {
        collectSpecs(suite, specs);
    });

    return specs;
}

export function getAttachmentUrl(filePath: string) { 
    const idx = filePath.indexOf('playwright');

    if (idx === -1) {
        return '';
    }

    const relativePath = filePath
        .substring(idx)
        .replace(/\\/g, '/');

    return `${getApiFiles()}/${relativePath}`;
}

function groupByFile(allTest: TestResult[]){
    const groupedTests = allTest.reduce <Record<string, TestResult[]>>((groups, test) => {
        const file:string = test.file || test.file || 'unknown';

        if (!groups[file]) {
            groups[file] = [];
        }

        groups[file].push(test);

        return groups;
    }, {});

    return groupedTests
}

function buildStepTree(step: ReporterStep | TestStepNode, allSteps: TestResult[]):TestStepNode {
    return {
        ...step,
        children: allSteps
        .filter(s => s.parent === step.title)
        .map(s =>
            buildStepTree(
            {
                title: s.title,
                category: s.category,
                error:s.error?.message,
                status: s.status ?? "",
                duration: s.duration,
                children: [],
            },
            allSteps
            )
        ),
    };
}


export function buildResultsMap(report: any, test: TestResult[]) {
    const specs = getAllSpecs(report);
    const result:TestResult[] = []
    
    for (const spec of specs) {
        const run = spec.tests?.[0];

        if (!run) {
        continue;
        }

        const lastResult = run.results?.[run.results.length - 1];

        const subTest = test.find(val => val.title === spec.title)
        const executionSteps = subTest?.steps ?? [];

        result.push({
        id: spec.id,
        title: spec.title,
        file: spec.file,
        project: run.projectName,
        status: lastResult?.status ?? run.expectedStatus ?? "skipped",
        duration: lastResult?.duration,
        retries: run.results?.length - 1 || 0,
        error: lastResult?.error?.message?.replace(/\x1B\[[0-9;]*m/g, ""),
        steps:lastResult?.steps?.map((step: ReporterStep) =>
                buildStepTree(step, executionSteps)
            ) ?? [],


        attachments:
            lastResult?.attachments?.map((attachment: any) => ({
            name: attachment.name,
            contentType: attachment.contentType,
            path: getAttachmentUrl(attachment.path),
            })) ?? [],
        });
    }

    const groupedResult = groupByFile(result)
    return groupedResult;
}
