export const getEmployeeLeaveBalance = async (
    req: TypedAuthRequest<any, any, { emp_id: string }>,
    res: Response,
) => {
    try {
        const employeeId = req.query.emp_id
            ? Number(req.query.emp_id)
            : Number(req.user?.id);

        const now = moment();
        const currentYear = now.year();
        const currentMonth = now.month() + 1;

        // :white_check_mark: Get employee
        const employee = await prisma.users.findUnique({
            where: { id: employeeId },
            select: {
                joining_date: true,
            },
        });

        if (!employee) {
            return sendError(res, "Employee not found", 400);
        }

        // :white_check_mark: Joining logic
        const hireDate = moment(employee.joining_date);
        const hireYear = hireDate.year();
        console.log(hireYear, 'hireYear');

        const hireMonth = hireDate.month() + 1;
        console.log(hireMonth, 'hireMonth');
        const hireDay = hireDate.date();
        console.log(hireDay, 'hireDay');



        let effectiveStartMonth = hireMonth;

        if (hireDay > 10) {
            effectiveStartMonth = hireMonth + 1;
        }

        console.log(effectiveStartMonth, 'effectiveStartMonth');

        if (effectiveStartMonth > 12) {
            effectiveStartMonth = 13; // no leaves for that year
        }

        let startMonth = currentYear === hireYear ? effectiveStartMonth : 1;

        if (startMonth > 12) {
            startMonth = 13;
        }

        // TOTAL ENTITLED LEAVES (yearly)
        let totalEntitledLeaves = 0;

        if (currentYear === hireYear) {
            totalEntitledLeaves =
                effectiveStartMonth > 12 ? 0 : 12 - effectiveStartMonth + 1;
        } else {
            totalEntitledLeaves = 12;
        }

        // :white_check_mark: Start date based on policy (NOT Jan)
        const startDate = moment()
            .year(currentYear)
            .month(startMonth - 1)
            .startOf("month")
            .toDate();

        console.log(startDate, 'startDate');
        const currentDate = moment().endOf("month").toDate();
        console.log(currentDate, 'currentDate');



        // :white_check_mark: Fetch leave data
        const leaveData = await prisma.leaveApplicationDays.findMany({
            where: {
                leave_date: {
                    gte: startDate,
                    lte: currentDate,
                },
                leave_application: {
                    status: "Approved",
                    employee_id: employeeId,
                },
            },
            select: {
                leave_date: true,
                day_value: true, // :fire: important for half-day
            },
        });

        // :white_check_mark: Group by month (with half-day support)
        const leaveMap: Record<string, number> = {};

        leaveData.forEach((l) => {
            const key = moment(l.leave_date).format("YYYY-MM");
            leaveMap[key] = (leaveMap[key] || 0) + Number(l.day_value || 0);
        });

        // :white_check_mark: MAIN LOGIC
        let balance = 0;
        let totalLWP = 0;

        for (let m = startMonth; m <= currentMonth; m++) {
            const key = `${currentYear}-${String(m).padStart(2, "0")}`;

            const taken = leaveMap[key] || 0;

            console.log(taken, "taken");

            // :heavy_plus_sign: Earn 1 leave every month
            balance += 1;

            if (taken <= 1) {
                balance -= taken; // 0.5 or 1
            } else {
                balance -= 1; // max deduction
                totalLWP += taken - 1; // extra is LWP
            }

            if (balance < 0) balance = 0;
        }

        console.log(balance, "balance");

        return sendSuccess(
            res,
            "Employee leave balance fetched successfully",
            200,
            {
                remainingBalance: Number(balance.toFixed(2)),
                totalEntitledLeaves: totalEntitledLeaves,
            },
        );
    } catch (error: any) {
        logger.error(error.message, "[ADMIN] [LEAVE] [getEmployeeLeaveBalance]");
        return sendError(res, "Something Went Wrong!", 500, error.message);
    }
};