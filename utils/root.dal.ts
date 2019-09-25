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
        private readonly Model: Model<ModelType>,
        private readonly ctx: object
    ) {}

    async create(data: CreateType): Promise<ReturnType> {
        const newDoc = await new this.Model(data).save();
        const doc = newDoc.toObject();

        return deleteProps(doc, ["__v"]);
    }

    findOne(options: DALOptions = {}): Promise<ReturnType> {
        const { select = this.select } = options;

        return this.Model.findOne(this.ctx)
            .select(select)
            .lean()
            .exec();
    }

    findAll(options: DALOptions = {}): Promise<ReturnType[]> {
        const { select = this.select } = options;

        return this.Model.find(this.ctx)
            .select(select)
            .lean()
            .exec();
    }

    updateOne(data: object, options: DALOptions = {}): Promise<ReturnType> {
        const { select = this.select, upsert = this.upsert } = options;

        return this.Model.findOneAndUpdate(this.ctx, data, {
            new: true,
            upsert
        })
            .select(select)
            .lean()
            .exec();
    }

    deleteOne(options: DALOptions = {}): Promise<ReturnType> {
        const { select = this.select } = options;

        return this.Model.findOneAndDelete(this.ctx)
            .select(select)
            .lean()
            .exec();
    }
}
