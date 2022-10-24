let randomIdentifier=$RANDOM*$RANDOM

# set subscription
readonly AZ_SUBSCRIPTION=""
# resource group
readonly AZ_RESOURCE_GROUP="myTestingRG${randomIdentifier}"
readonly AZ_RESOURCE_GROUP_LOCATION="japaneast"
# storage account
# why need storage account?
# https://learn.microsoft.com/ja-jp/azure/azure-functions/storage-considerations?tabs=azure-cli
# name must be between 3 and 24 characters in length and use numbers and lower-case letters only.
readonly AZ_STORAGE_ACCOUNT="mytestsa${randomIdentifier}"
# https://learn.microsoft.com/ja-jp/rest/api/storagerp/srp_sku_types
# https://wisdom-gate.jp/blog/2018/12/11/sku%E3%81%A3%E3%81%A6%EF%BC%9F/
readonly AZ_STORAGE_ACCOUNT_SKU="Standard_LRS"
# azure functions
readonly AZ_FUNCTION="myTestFunction${randomIdentifier}"
# https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-versions?tabs=azure-cli%2Cwindows%2Cin-process%2Cv4&pivots=programming-language-typescript
readonly AZ_FUNCTION_VERSION="4"
# you check available runtime with command below:
# az functionapp list-runtimes
readonly AZ_FUNCTION_RUNTIME="node"
# cosmomsDB
readonly AZ_COSMOS_DB="cosmosdb${randomIdentifier}"

# set subscription
# az account set -s ${AZ_SUBSCRIPTION}

# check if the specified resource group already exists if not create a new one
echo "Checking the specifed resource group..."
RG_FOUND=$(az group show -g ${AZ_RESOURCE_GROUP} -o tsv --query "properties.provisioningState")
if [ "${RG_FOUND}" = "Succeeded" ]; then
    echo "The resource group: ${AZ_RESOURCE_GROUP} already exists."
    exit
else
    echo "Creating a new resource group..."
    az group create \
        --name ${AZ_RESOURCE_GROUP} \
        --location ${AZ_RESOURCE_GROUP_LOCATION}
    echo "Done! ${AZ_RESOURCE_GROUP} has been created."
fi


echo "Creating storage account..."
az storage account create \
    --name ${AZ_STORAGE_ACCOUNT} \
    --location ${AZ_RESOURCE_GROUP_LOCATION} \
    --resource-group ${AZ_RESOURCE_GROUP} \
    --sku ${AZ_STORAGE_ACCOUNT_SKU}
echo "Done! ${AZ_STORAGE_ACCOUNT} has been created."

echo "Creating azure function..."
az functionapp create \
    --name ${AZ_FUNCTION} \
    --storage-account ${AZ_STORAGE_ACCOUNT} \
    --consumption-plan-location ${AZ_RESOURCE_GROUP_LOCATION} \
    --resource-group ${AZ_RESOURCE_GROUP} \
    --functions-version ${AZ_FUNCTION_VERSION} \
    --runtime ${AZ_FUNCTION_RUNTIME}
echo "Done! ${AZ_FUNCTION} has been created."


echo "Creating cosmosdb..."
az cosmosdb create \
    --resource-group ${AZ_RESOURCE_GROUP} \
    --name ${AZ_COSMOS_DB} \
    --enable-free-tier true \
    --enable-analytical-storage false
echo "Done! ${AZ_COSMOS_DB} has been created."


db_endpoint=$(az cosmosdb show \
    --resource-group ${AZ_RESOURCE_GROUP} \
    --name ${AZ_COSMOS_DB} \
    -o tsv \
    --query "documentEndpoint")

primary_key=$(az cosmosdb keys list \
    --resource-group ${AZ_RESOURCE_GROUP} \
    --name ${AZ_COSMOS_DB} \
    --type "keys" \
    -o tsv \
    --query "primaryMasterKey")


cat <<EOF
# CosmosDB endpoint
${db_endpoint}
# CosmosDB primary key
${primary_key}
# Delete the resource group
az group delete --resource-group ${AZ_RESOURCE_GROUP} -y
EOF

# https://learn.microsoft.com/ja-jp/azure/azure-functions/create-first-function-cli-node?tabs=azure-cli%2Cbrowser
# func new --name get-todo --template "HTTP trigger" --authlevel "anonymous"　--language typescript

# func azure functionapp publish <APP_NAME>