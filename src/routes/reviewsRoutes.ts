import {  Router } from "express";
import { createReview, deleteReview, getAllReviews, getReviewById, updateReview } from "../controllers/reviewsController";
const router = Router ();

export {router}

//Crear 
router.post("/", createReview);
//Modificar 
router.put("/", updateReview);
//Recuperar por el id
router.get("/", getReviewById);
//Recuperar todas 
router.get("/all", getAllReviews);
//Eliminar 
router.delete("/", deleteReview);

