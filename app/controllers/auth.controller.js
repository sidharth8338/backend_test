const UserModel = require("../models/user.model");
const { successResponse, errorResponse } = require("../utils/response.utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

exports.authenticateUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await UserModel.findOne({
      $or: [
        {
          email: data?.email,
        },
        {
          username: data?.username,
        },
      ],
    });
    if (!user) {
      res
        .status(400)
        .send(errorResponse("User is not registered with this email ID!"));
    } else {
      let matched = await bcrypt.compare(data.password, user.password);
      if (matched) {
        const accessToken = jwt.sign(
          {
            user_id: user._id,
          },
          process.env.JWT_AUTH_TOKEN_SECRET,
          { expiresIn: "24h" }
        );
        res.status(200).send(
          successResponse(
            {
              token: accessToken,
              message: "Successfully Verified",
            },
            res.statusCode,
            res.statusMessage
          )
        );
      } else {
        res
          .status(406)
          .send(errorResponse("User ID or Password is incorrect!"));
      }
    }
  } catch (e) {
    res
      .status(406)
      .send(errorResponse(e.message, res.statusCode, res.statusMessage));
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    let data = req.body;
    const user = await UserModel.findOne({
      $or: [{ username: data.username }, { email: data.email }],
    });
    if (!user) {
      bcrypt.hash(data.password, saltRounds, function (err, hash) {
        if (err) {
          throw new Error(err);
        }
        UserModel.create({
          ...data,
          password: hash,
        })
          .then((r) => {
            const accessToken = jwt.sign(
              {
                user_id: r._id,
              },
              process.env.JWT_AUTH_TOKEN_SECRET,
              { expiresIn: "24h" }
            );
            res.status(201).send(
              successResponse({
                token: accessToken,
                message: "Successfully Verified",
              })
            );
          })
          .catch((e) => {
            throw new Error(e);
          });
      });
    } else {
      throw new Error(
        "User is Already Registered with this mail ID or username."
      );
    }
  } catch (e) {
    res.status(406).send(errorResponse(e.message ? e.message : e));
  }
};

exports.updateProfileController = async (req, res) => {
  try {
    const data = req.body;
    if (!data.password) {
      const updatedUser = await UserModel.findByIdAndUpdate(
        data.user_id,
        data,
        {
          new: true,
        }
      );

      res.status(200).send(successResponse(updatedUser));
    } else {
      bcrypt.hash(data.password, saltRounds, async (err, hash) => {
        if (err) {
          res.status(406).send(errorResponse(err));
          return err;
        }
        const updatedUser = await UserModel.findByIdAndUpdate(
          data.user_id,
          { ...data, password: hash },
          {
            new: true,
          }
        );

        res.status(200).send(successResponse(updatedUser));
      });
    }
  } catch (e) {
    res.status(406).send(errorResponse(e));
  }
};
