import express from 'express';
import { param } from 'express-validator';
import restaurantController from '../controllers/restaurantController';

const router = express.Router();

router.get('/:restaurantId', param('restaurantId')
  .isString()
  .trim()
  .notEmpty()
  .withMessage('Restaurant id parameter must be a valid string'),
  restaurantController.getRestaurant
)
router.get(
  '/search/:city',
  param('city')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('City parameter must be a valid string'),
  restaurantController.searchRestaurants
);

export default router;