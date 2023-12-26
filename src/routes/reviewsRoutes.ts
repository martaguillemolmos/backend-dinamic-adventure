import {  Router } from "express";
import { createReview, deleteReview, getAllReviews, getReviewById, updateReview } from "../controllers/reviewsController";
import { auth } from "../middelware/auth";
import { isSuperAdmin } from "../middelware/isSuperAdmin";
const router = Router ();

export {router}

//Crear 
router.post("/", auth, createReview);
//Modificar 
router.put("/", auth, updateReview);
//Recuperar por el id
router.get("/",  getReviewById);
//Recuperar todas 
router.get("/all", getAllReviews);
//Eliminar 
router.delete("/", auth, isSuperAdmin, deleteReview);

