import { SqsRoutes } from "aws-events-adapter";
import { queueUseCases } from "../../interfaces/queue/queueUseCases";

export const queueRouter: SqsRoutes = {
    "HelloQueue": queueUseCases.HelloQueue
};

