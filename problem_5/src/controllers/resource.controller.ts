import { Request, Response } from 'express';
import Resource from '../models/resource.model';
import { ERROR_MESSAGE } from "../utils/constants";

// Create
export const createResource = async (req: Request, res: Response) => {
    const resource = await Resource.create(req.body);
    res.status(201).json(resource);
};

// Read all with filters
export const getResources = async (req: Request, res: Response) => {
    const {name, isActive} = req.query;
    const filter: any = {};
    if(name) filter.name = new RegExp(name as string, 'i');
    if(isActive !== undefined) filter.isActive = isActive === 'true';

    const resources = await Resource.find(filter);
    res.json(resources);
};

// Read one
export const getResourceById = async (req: Request, res: Response) => {
    const resource = await Resource.findById(req.params.id);
    if(!resource) return res.status(404).json({message: ERROR_MESSAGE.NOT_FOUND});
    res.json(resource);
};

// Update
export const updateResource = async (req: Request, res: Response) => {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!resource) return res.status(404).json({message: ERROR_MESSAGE.NOT_FOUND});
    res.json(resource);
};

// Delete
export const deleteResource = async (req: Request, res: Response) => {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if(!resource) return res.status(404).json({message: ERROR_MESSAGE.NOT_FOUND});
    res.json({message: ERROR_MESSAGE.DELETED});
};
