import { Model, Document } from "mongoose";
import { deleteProps } from "./object.util";
import { DALOptions } from "../@types/types";

export abstract class RootDAL<
    ModelType extends Document,
    CreateType extends object,
    ReturnType extends object
> {
    private readonly select = "-__v";

    private readonly upsert = false;

    constructor(
        private readonly MongooseModel: Model<ModelType>,
        private readonly ctx: object
    ) {}

    async create(data: CreateType): Promise<ReturnType> {
        const newDoc = await new this.MongooseModel(data).save();
        const doc = newDoc.toObject();

        return deleteProps(doc, ["__v"]);
    }

    findOne(options: DALOptions = {}): Promise<ReturnType> {
        const { select = this.select } = options;

        return this.MongooseModel.findOne(this.ctx)
            .select(select)
            .lean()
            .exec();
    }

    findAll(options: DALOptions = {}): Promise<ReturnType[]> {
        const { select = this.select } = options;

        return this.MongooseModel.find(this.ctx)
            .select(select)
            .lean()
            .exec();
    }

    updateOne(data: object, options: DALOptions = {}): Promise<ReturnType> {
        const { select = this.select, upsert = this.upsert } = options;

        return this.MongooseModel.findOneAndUpdate(this.ctx, data, {
            new: true,
            upsert,
        })
            .select(select)
            .lean()
            .exec();
    }

    deleteOne(options: DALOptions = {}): Promise<ReturnType> {
        const { select = this.select } = options;

        return this.MongooseModel.findOneAndDelete(this.ctx)
            .select(select)
            .lean()
            .exec();
    }
}
