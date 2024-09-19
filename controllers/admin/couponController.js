const otpGenerator = require('otp-generator');
const couponModel = require('../../models/couponModel')

const loadCoupons = async (req, res, next) => {
    try {

        const page = parseInt(req.query.page) || 1
        const limit = 5
        const skip = (page - 1) * limit

        const findAllCoupons = await couponModel.find().sort({ createdAt: 1 }).limit(limit).skip(skip);
        const totalCoupons = await couponModel.countDocuments();
        const totalPages = Math.ceil(totalCoupons / limit);

        res.render('admin/coupons', { coupons: findAllCoupons, currentPage: page, totalPages })
    } catch (error) {
        next(error)
    }
}

const loadCreateCoupon = async (req, res, next) => {
    try {
        res.render('admin/createcoupon')
    } catch (error) {
        next(error)
    }
}

const createCoupon = async (req, res, next) => {
    try {
        const { name, amount, startDate, endDate, minPurchaseAmount, description } = req.body

        const existingCoupon = await couponModel.findOne({ name: name })

        if (existingCoupon) {
            console.log("this coupon already exists")
            return res.send({ error: 5 })
        }

        const code = otpGenerator.generate(4, { lowerCaseAlphabets: false, specialChars: false, upperCaseAlphabets: false })

        const newCoupon = new couponModel({
            name: name,
            code: name.toUpperCase() + code,
            description: description,
            discountAmount: amount,
            startDate: startDate,
            endDate: endDate,
            minPurchaseAmount: minPurchaseAmount
        })

        const saveNewCoupon = await newCoupon.save()

        if (saveNewCoupon) {
            console.log("success created new coupon")
            res.send({ success: 7 })
        }
    } catch (error) {
        next(error)
    }
}

const loadEditCoupon = async (req, res, next) => {
    try {
        const { couponId } = req.query;

        if (!couponId) {
            return res.status(400).send({ error: 'Coupon ID is required' });
        }

        // Find the coupon by ID
        const coupon = await couponModel.findById(couponId);
        
        if (!coupon) {
            return res.status(404).send({ error: 'Coupon not found' });
        }

        // Render the edit page with the coupon details
        res.render('admin/editCoupon', { coupon });

    } catch (error) {
        next(error); // Pass any errors to the error-handling middleware
    }
};


const editCoupon = async (req, res, next) => {
    try {
        const { couponId, name, amount, startDate, endDate, minPurchaseAmount, description } = req.body;

        // Check if the new name conflicts with another existing coupon (excluding the current one)
        const existingCoupon = await couponModel.findOne({ name: name, _id: { $ne: couponId } });
        if (existingCoupon) {
            console.log("Another coupon with this name already exists");
            return res.send({ error: "Another coupon with this name already exists" }); 
        }

        // Update the coupon using findByIdAndUpdate with the $set operator
        const updatedCoupon = await couponModel.findByIdAndUpdate(
            couponId,
            {
                $set: {
                    name: name,
                    description: description,
                    discountAmount: amount,
                    startDate: startDate,
                    endDate: endDate,
                    minPurchaseAmount: minPurchaseAmount
                }
            },
            { new: true }
        );

        if (updatedCoupon) {
            console.log("Successfully updated coupon");
            res.send({ success: "Successfully updated coupon" });
        } else {
            console.log("Coupon not found");
            res.send({ error: "Coupon not found" }); 
        }
    } catch (error) {
        next(error); 
    }
};

const deleteCoupon = async (req, res, next) => {
    try {
        const { couponId } = req.body

        if (!couponId) {
            return console.log("can't get any coupon id at delete coupon")
        }

        const deleting = await couponModel.findByIdAndDelete(couponId)

        if (deleting) {
            console.log('deleting coupon success')
            res.send({ success: 7 })
        }


    } catch (error) {
        next(error)
    }
}

module.exports = {
    loadCoupons,
    loadCreateCoupon,
    createCoupon,
    deleteCoupon,
    loadEditCoupon,
    editCoupon,
}